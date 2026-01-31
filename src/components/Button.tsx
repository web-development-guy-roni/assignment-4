import React from 'react'

type BootstrapVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link'

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: BootstrapVariant
    isLoading?: boolean
    leftIcon?: React.ReactNode
  },
) {
  const { variant = 'primary', isLoading, leftIcon, className, disabled, children, ...rest } = props

  return (
    <button
      className={['btn', `btn-${variant}`, className].filter(Boolean).join(' ')}
      disabled={disabled || isLoading}
      {...rest}
    >
      {leftIcon ? <span className="me-2">{leftIcon}</span> : null}
      {isLoading ? 'Loading...' : children}
    </button>
  )
}

