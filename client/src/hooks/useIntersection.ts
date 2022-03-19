import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

const useIntersection = (targetRef: RefObject<HTMLElement>) => {
  /*
    무한스크롤
    1
     - scrollTop + window.clientHeight 등을 이용해 끝에 도달했는지 계산
     - eventHandler (scroll) => 감시. throttle / debounce -> 쓰레드 메모리 차지, 성능 저하
    2 interSectionObserver
     - 이벤트 등록 X 브라우저에서 제공하는 별개의 감시자. 성능 ⬆
*/
  const observerRef = useRef<IntersectionObserver>()
  const [intersecting, setIntersecting] = useState(false)

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(entries => {
        setIntersecting(entries.some(entry => entry.isIntersecting))
      })
    }
    return observerRef.current
  }, [observerRef.current])

  useEffect(() => {
    if (targetRef.current) getObserver().observe(targetRef.current)
  }, [targetRef.current])

  return intersecting
}

export default useIntersection
