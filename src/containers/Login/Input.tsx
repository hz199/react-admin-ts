import * as React from 'react'

type InputType = 'text' | 'password'

interface IProps {
  type: InputType
  name?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: IProps) => {
  const inputEL = React.useRef<HTMLInputElement>(null)

  const onFocusFunc = function() {
    this.className = 'focus'
  }
  const onBlurFunc = function() {
    if (this.value === '') {
      this.className = ''
    }
  }

  const addEventInputHandle = () => {
    inputEL.current!.addEventListener('focus', onFocusFunc)
    inputEL.current!.addEventListener('blur', onBlurFunc)
  }

  const removeEventInputHandle = () => {
    inputEL.current!.removeEventListener('focus', onFocusFunc)
    inputEL.current!.removeEventListener('blur', onBlurFunc)
  }

  React.useEffect(() => {
    addEventInputHandle()
    return () => {
      removeEventInputHandle()
    }
  }, [])

  const { type, placeholder, onChange, name } = props

  return (
    <div className="form-item">
      <input
        onChange={(e) => {
          onChange && onChange(e)
        }}
        autoComplete="off"
        name={name}
        ref={inputEL}
        type={type}
      ></input>
      <span data-placeholder={placeholder}></span>
    </div>
  )
}

export default Input
