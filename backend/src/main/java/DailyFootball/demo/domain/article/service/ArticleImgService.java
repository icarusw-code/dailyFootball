package DailyFootball.demo.domain.article.service;

import DailyFootball.demo.domain.article.DTO.ArticleImgDto;
import DailyFootball.demo.domain.article.DTO.ArticleImgResponseDto;
import DailyFootball.demo.domain.article.domain.ArticleImg;
import DailyFootball.demo.domain.article.repository.ArticleImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArticleImgService {

    private final ArticleImgRepository articleImgRepository;

    /**
     * 이미지 개별 조회
     */
    @Transactional
    public ArticleImgDto findByFileId(Long id){

        ArticleImg articleImg = articleImgRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 파일이 존재하지 않습니다."));

        ArticleImgDto articleImgDto = ArticleImgDto.builder()
                .originFileName(articleImg.getOriginFileName())
                .articleImg(articleImg.getArticleImg())
                .build();

        return articleImgDto;
    }


    /**
     * 이미지 전체 조회
     */
    @Transactional
    public List<ArticleImgResponseDto> findAllByArticle(Long articleId) {

        List<ArticleImg> ImageList = articleImgRepository.findAllByArticleId(articleId);

        return ImageList.stream()
                .map(ArticleImgResponseDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 파일 삭제
     */
    public void deleteImgae(ArticleImgResponseDto dbImage) {
        articleImgRepository.deleteById(dbImage.getFileId());
    }
}
