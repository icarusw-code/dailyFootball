package DailyFootball.demo.domain.article.controller;

import DailyFootball.demo.domain.article.DTO.*;
import DailyFootball.demo.domain.article.domain.Article;
import DailyFootball.demo.domain.article.service.ArticleImgService;
import DailyFootball.demo.domain.article.service.ArticleService;
import DailyFootball.demo.global.util.PageUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ArticleApiController {

    private final ArticleService articleService;
    private final ArticleImgService articleImgService;

    /**
     * 글 생성
     */
    @PostMapping("/article/write")
    public ResponseEntity createArticle(@RequestPart ArticleWriteResponseDto articleWriteResponseDto,
                                        @RequestPart(value = "file") List<MultipartFile> files
    ) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        Long articleId = articleService.createArticle(articleWriteResponseDto, files);
        responseMap.put("articleId", articleId);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

    /**
     * 글 삭제
     */
    @DeleteMapping("/article/delete/{articleId}")
    public ResponseEntity deleteArticle(Model model, @PathVariable("articleId") Long articleId) {
        try {
            articleService.deleteById(articleId);
        } catch (EmptyResultDataAccessException e) {
            model.addAttribute("해당 글이 존재 하지 않습니다.", articleId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(model);
        }
        model.addAttribute("articleId", articleId);
        return ResponseEntity.status(HttpStatus.OK).body(model);
    }


    /**
     * 글 전체 조회(목록)
     */
    @GetMapping("/article")
    public ResponseEntity getArticle(@RequestParam("page") int page, ModelMap model) {
        Page<ArticleFindDto> articles = articleService.findAllArticle(page);
        Pageable pageable = articles.getPageable();
        model.addAttribute("page", PageUtils.getPages(pageable, articles.getTotalPages()));
        model.addAttribute("articles", articles);
        return ResponseEntity.status(HttpStatus.OK).body(model);
    }

    /**
     * 글 상세보기
     * articleFindDto를 재활용 했는데, id값이 같이 넘어오는거 따로 Dto를 만들어서 해결할지, 그대로 둘지 결정 필요
     */
    @GetMapping("/article/{articleId}")
    public ResponseEntity<Map<String, Object>> viewArticle(@PathVariable("articleId") Long articleId) {
        Map<String, Object> responseMap = new HashMap<>();
        articleService.updateReadCount(articleId);
        Optional<Article> articleInfos = articleService.findArticleInfo(articleId);
        List<ArticleFindDto> articleFindDtoList = articleInfos.stream()
                .map(m -> new ArticleFindDto(m.getTitle(), m.getContent(), m.getReadCount(), m.getLikesCount(), m.getUser().getId(), m.getModifiedDate()))
                .collect(Collectors.toList());

        responseMap.put("articleInfo", articleFindDtoList);
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }

    /**
     * 글 상세보기 -> 이미지 조회
     * 1. 클라이언트 -> 서버: 게시글 id를 전달하여 첨부된 이미지 전체 조회 요청
     * 2. 서버 -> 클라이언트: 이미지 id를 리스트 형태로 반환
     * 3. 클라이언트 -> 서버: 이미지 id를 전달하여 이미지 개별 조회 요청
     * 4. 서버 -> 클라이언트: 이미지 반환
     * 5. 클라이언트: 반환 받은 이미지를 <img> 태그를 이용하여 출력
     */
    @CrossOrigin
    @GetMapping(
            value = "/articleImage/{articleImageId}",
            produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE}
    )
    public ResponseEntity<byte[]> getImage(@PathVariable Long articleImageId) throws IOException{
        ArticleImgDto articleImgDto = articleImgService.findByFileId(articleImageId);
        String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;
        String path = articleImgDto.getArticleImg();

        InputStream imageStream = new FileInputStream(absolutePath + path);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();

        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }


    /**
     * 글 수정
     */
    @PutMapping("/article/{articleId}")
    public ResponseEntity update(@PathVariable("articleId") Long articleId, ArticleFileDto articleFileDto) throws Exception {
        // title, content 수정
        ArticleUpdateRequestDto requestDto = ArticleUpdateRequestDto.builder()
                .title(articleFileDto.getTitle())
                .content(articleFileDto.getContent())
                .build();

        // 이미지 수정
        // DB에 저장된 파일 불러오기
        List<ArticleImgResponseDto> dbImageList = articleImgService.findAllByArticle(articleId);

        // 전달되어온 파일들
        List<MultipartFile> multipartList = articleFileDto.getFiles();

        // 새롭게 전달된 파일 목록을 저장
        List<MultipartFile> addFileList = new ArrayList<>();

        if (CollectionUtils.isEmpty(dbImageList)) { // 아예 존재하지 않는 경우
            if (!CollectionUtils.isEmpty(multipartList)) { // 전달된 파일이 존재
                for (MultipartFile multipartFile : multipartList)
                    addFileList.add(multipartFile); // 저장할 목록에 추가
            }
        } else { // DB에 파일이 존재
            if (CollectionUtils.isEmpty(multipartList)) { // 전달된 파일이 존재하지 않음
                // 파일 삭제
                for (ArticleImgResponseDto dbImage : dbImageList)
                    articleImgService.deleteImgae(dbImage);
            } else { // 전달된 파일이 존재

                // DB에 저장되어 있는 파일 원본명 목록
                List<String> dbNameList = new ArrayList<>();

                // DB의 파일 원본명 추출
                for (ArticleImgResponseDto dbArticleImg : dbImageList) {
                    // file id 로 DB에 저장된 파일 정보 가져오기
                    ArticleImgDto dbArticleImageDto = articleImgService.findByFileId(dbArticleImg.getFileId());
                    // DB의 파일 이름 얻어오기
                    String dbFileName = dbArticleImageDto.getOriginFileName();

                    if (!multipartList.contains(dbFileName)) { // 서버에 저장된 파일들 중 전달된 파일이 존재하지 않으면
                        articleImgService.deleteImgae(dbArticleImg); // 파일 삭제
                    }
                    else
                        dbNameList.add(dbFileName); // DB에 저장할 파일 목록에 추가
                }

                for (MultipartFile multipartFile : multipartList) { // 전달된 파일 하나씩 확인
                    // 파일 이름 가져오기
                    String multipartName = multipartFile.getOriginalFilename();
                    if (!dbNameList.contains(multipartName)) { // DB에 없는 파일이면
                        addFileList.add(multipartFile); // DB에 저장할 파일 목록에 추가
                    }
                }
            }
        }
        articleService.update(articleId, requestDto, addFileList);
        return ResponseEntity.status(HttpStatus.OK).body("ok");
    }
}



