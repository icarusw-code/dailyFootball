package DailyFootball.demo.global.util;

import org.springframework.data.domain.Pageable;

import java.util.HashMap;
import java.util.Map;

public class PageUtils {

    static int pageScale = 5;

    public static Map<String, Object> getPages(Pageable page, int totalPage){
        Map<String, Object> pageMap = new HashMap<String, Object>();
        int size = page.getPageSize();
        int pageNumber = page.getPageNumber() + 1;
        int startPage = ((pageNumber - 1) / pageScale) * pageScale;
        int endPage = startPage + pageScale - 1;

        if ( endPage >= totalPage){
            endPage = totalPage;
        }

        int inPage = (pageNumber - 1) / size + 1;

        pageMap.put("StartPage", startPage);
        pageMap.put("EndPage", endPage);
        return pageMap;
    }
}
