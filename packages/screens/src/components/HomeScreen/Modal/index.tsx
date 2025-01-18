import { Dialog, Transition } from '@headlessui/react'
import React, { type FC, useEffect, useState } from 'react'

// import ActionButton from './Components/ActionButton'
// import ModalBoxContent from './Components/ModalBoxContent'
// import ModalIcon from './Components/ModalIcon'

declare module globalThis {
  var isModalOpen: boolean

  var openModal: (element: IModalProps) => void
  var closeModal: (isCancelable: boolean) => void
  // var onPasteContent: () => () => any
  // var refreshUI: () => any
}

export interface IModalProps {
  title?: string
  description?: string
  type: 'error' | 'success' | 'confirm' | 'warning' | 'icon' | 'none'
  contentType?: 'default' | 'with-background' | 'no-action-btn'
  content?: React.ReactNode | string
  onCancel?: () => any
  onOk?: () => any
  disableClickOutside?: boolean
  isExpanded?: boolean
  isWaitingCancel?: boolean
  className?: string
  subView?: React.ReactNode | string
  customTexts?: {
    textOk?: string
    textCancel?: string
  }
  timeOut?: number
}

interface IState {
  isOpen: boolean
  element?: IModalProps
}

const defaultState: IState = {
  isOpen: false,
  element: undefined,
}

export const Modal: FC = () => {
  const [state, setState] = useState<IState>(defaultState)

  const [isShow, setIsShow] = useState(false)
  const [content, setContent] = useState()
  const [, setVariant] = useState()
  const [textConfirm, setTextConfirm] = useState()
  const [textCancel, setTextCancel] = useState()
  const [type, setType] = useState()
  const [title, setTitle] = useState()
  const [size, setSize] = useState()
  const [okFunction, setOkFunction] = useState()
  const [btnLoading, setBtnLoading] = useState()
  const [btnDisabled, setBtnDisabled] = useState()
  const [isTransparent, setIsTransparent] = useState(false)
  const [isCenter, setIsCenter] = useState()
  const [cancelable, setCancelable] = useState(true)
  const [customSize, setCustomSize] = useState()
  const [contentClassName, setContentClassName] = useState()
  // @ts-ignore
  const { isOpen, element = {} as IModalProps }: { isOpen: boolean; element: IModalProps } = state

  const openModal = ({
    type,
    title,
    size = 'lg',
    content,
    variant,
    textCancel,
    textConfirm,
    callback,
    transparent,
    centered = true,
    cancelable = true,
    contentClassName,
    customSize,
    disabledCofirmBtn = false,
  }) => {
    console.log('open Modal pls')

    setIsShow(true)
    setType(type)
    setTitle(title)
    setContent(content)
    setVariant(variant)
    setTextCancel(textCancel)
    setTextConfirm(textConfirm)
    setIsTransparent(transparent)
    setOkFunction({ trigger: callback }) // function is only passed as an object
    setCancelable(cancelable)
    setCustomSize(customSize)
    setContentClassName(contentClassName)
  }

  const closeModal = () => {
    setIsShow(false)
  }

  const closeOutside = () => {
    closeModal()
  }

  // useEffect(() => {
  //   window.openModal = openModal
  //   window.closeModal = closeModal
  //   // globalThis.onPasteContent = () => () => {}
  //   // globalThis.refreshUI = () => {}
  // }, [closeModal, openModal])

  useEffect(() => {
    window.openModal = openModal
    window.closeModal = closeModal
  }, [])

  return (
    <Transition
      show={isShow}
      appear={true}
      unmount
      enter="transition duration-300 ease-in-out"
      enterFrom="transition transform duration-300 translate-y-full opacity-0"
      enterTo="transition transform duration-300 translate-y-0 opacity-100"
      leave="transition duration-200 ease-in-out"
      leaveFrom="transition transform duration-300 translate-y-0 opacity-100"
      leaveTo="transition transform duration-300 translate-y-full opacity-0"
      as={React.Fragment}
    >
      <Dialog
        onClose={closeOutside}
        onClick={closeOutside}
        className={'fixed left-0 top-0 right-0 z-50 h-screen w-screen bg-backgroundModal'}
      >
        <div onClick={(e) => e.stopPropagation()}>{content}</div>
      </Dialog>
    </Transition>
  )
}
