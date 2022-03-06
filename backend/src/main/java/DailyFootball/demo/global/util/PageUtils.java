package DailyFootball.demo.global.util;

import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.Map;

public class PageUtils {

    static int pageScale = 5;

    public static Map<String, Object> getPages(Pageable page, int totalPage){
        Map<String, Object> pageMap = new HashMap<String, Object>();
        int size = page.getPageSize(); // ArticleService에서 정해준 size를 가져옴 (10)
        int pageNumber = page.getPageNumber() + 1; // pageNumber 시작은 0부터
        int startPage = ((pageNumber - 1) / pageScale) * pageScale;
        int endPage = startPage + pageScale - 1;

        if ( endPage >= totalPage){
            endPage = totalPage;
        }

        int inPage = (pageNumber - 1) / size + 1;

        pageMap.put("StartPage", startPage + 1);
        pageMap.put("EndPage", endPage);
        return pageMap;
    }
}
