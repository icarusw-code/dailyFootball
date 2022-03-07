package DailyFootball.demo.global.util;

import DailyFootball.demo.domain.article.DTO.ArticleImgDto;
import DailyFootball.demo.domain.article.domain.ArticleImg;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class FileUtils {

    public List<ArticleImg> parseFileInfo(List<MultipartFile> multipartFiles) throws Exception{

        // 반환할 파일 리스트
        List<ArticleImg> fileList = new ArrayList<>();

        // 전달되어 온 파일이 존재할 경우
        if(!CollectionUtils.isEmpty(multipartFiles)){
            // 파일명을 업로드 한 날짜로 변환해서 저장
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter =
                    DateTimeFormatter.ofPattern("yyMMdd");
            String current_date = now.format(dateTimeFormatter);

            // 프로젝트 디렉터리 내의 저장을 위한 절대 경로 설정
            // 경로 구분자 File.separator 사용
            String absolutePath = new File("").getAbsolutePath() + File.separator + File.separator;

            // 파일을 저장할 세부 경로 지정
            String path = "articleImage" + File.separator + current_date;
            File file = new File(path);

            // 디렉터리가 존재하지 않을 경우
            if(!file.exists()) {
                boolean wasSuccessful = file.mkdirs();

                // 디렉터리 생성에 실패했을 경우
                if(!wasSuccessful)
                    System.out.println("file: was not successful");
            }

            // 다중 파일 처리
            for (MultipartFile multipartFile : multipartFiles) {

                // 파일 확장자 추출
                String originalFileExtension;
                String contentType = multipartFile.getContentType();

                // 확장자명이 존재하지 않을 경우 처리하지 않음
                if(ObjectUtils.isEmpty(contentType)) {
                    break;
                }
                else {  // 확장자가 jpeg, png인 파일들만 받아서 처리
                    if(contentType.contains("image/jpeg"))
                        originalFileExtension = ".jpg";
                    else if(contentType.contains("image/png"))
                        originalFileExtension = ".png";
                    else  // 다른 확장자일 경우 처리 x
                        break;
                }

                // 혹시 모를 파일명 중복제거 ( 나노 초를 더해줌)
                String newFileName = System.nanoTime() + originalFileExtension;

                ArticleImgDto articleImgDto = ArticleImgDto.builder()
                        .articleImg(path + File.separator + newFileName)
                        .build();

                ArticleImg articleImg = new ArticleImg(articleImgDto.getArticleImg());

                // 생성 후 리스트에 추가
                fileList.add(articleImg);

                // 업로드 한 파일 지정한 파일에 저장
                file = new File(absolutePath + path + File.separator + newFileName);
                multipartFile.transferTo(file);

            }
        }
        return fileList;
    }
}
