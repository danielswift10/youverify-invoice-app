import { useEffect } from 'react'

interface OutsideClickHandlerProps {
  ref: React.RefObject<HTMLElement>
  callbackHandler: () => void
}

const useOutsideClick = ({
  ref,
  callbackHandler
}: OutsideClickHandlerProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        callbackHandler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callbackHandler])
}

export default useOutsideClick
