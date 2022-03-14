package DailyFootball.demo.global.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

/**
 * K: 엔티티 key 타입
 * E: 엔티티의 타입
 * D: 엔티티가 변환된 DTO 타입
  */

public class NestConvertUtils<K, E, D> {

    private List<E> entities;
    private Function<E, D> toDto;
    private Function<E, E> getParent;
    private Function<E, K> getKey;
    private Function<D, List<D>> getChildren;

    public static <K, E, D> NestConvertUtils newInstance(List<E> entities, Function<E, D> toDto, Function<E, E> getParent, Function<E, K> getKey, Function<D, List<D>> getChildren){
        return new NestConvertUtils<K, E, D>(entities, toDto, getParent, getKey, getChildren);
    }

    public NestConvertUtils(List<E> entities, Function<E, D> toDto, Function<E, E> getParent, Function<E, K> getKey, Function<D, List<D>> getChildren) {
        this.entities = entities;
        this.toDto = toDto;
        this.getParent = getParent;
        this.getKey = getKey;
        this.getChildren = getChildren;
    }

    public List<D> convert(){
        try {
            return convertInternal();
        }catch (NullPointerException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    private List<D> convertInternal(){
        Map<K, D> map = new HashMap<>();
        List<D> roots = new ArrayList<>();

        for (E e : entities) {
            D dto = toDto(e);
            map.put(getKey(e), dto);
            if(hasParent(e)){
                E parent = getParent(e);
                K parentKey = getKey(parent);
                D parentDto = map.get(parentKey);
                getChildren(parentDto).add(dto);
            }else {
                roots.add(dto);
            }
        }
        return roots;
    }

    private boolean hasParent(E e) {
        return getParent(e) != null;
    }

    private E getParent(E e) {
        return getParent.apply(e);
    }

    private D toDto(E e) {
        return toDto.apply(e);
    }

    private K getKey(E e) {
        return getKey.apply(e);
    }

    private List<D> getChildren(D d) {
        return getChildren.apply(d);
    }
}
