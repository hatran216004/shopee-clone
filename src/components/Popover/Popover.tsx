import { useState, useRef, useId, type ElementType } from 'react'
import {
    useFloating,
    FloatingPortal,
    arrow,
    shift,
    offset,
    type Placement,
    flip,
    autoUpdate,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions,
    safePolygon
} from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
    children: React.ReactNode
    renderPopover: React.ReactNode
    className?: string
    as?: ElementType //chỉ định kiểu của một phần tử HTML hoặc một component React muốn render
    initialOpen?: boolean
    placement?: Placement
}

const Popover = ({
    children,
    className,
    renderPopover,
    as: Element = 'div',
    initialOpen,
    placement = 'bottom-end'
}: Props) => {
    const [isOpen, setIsOpen] = useState(initialOpen || false)
    const arrowRef = useRef<HTMLElement>(null)
    // useFloating: tính toán vị trí và kiểu của popover
    const data = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
        whileElementsMounted: autoUpdate,
        transform: false,
        placement
    })
    const { refs, floatingStyles, context } = data
    const hover = useHover(context, { handleClose: safePolygon() }) //  xử lý hover
    const focus = useFocus(context) // xử lý focus
    const dismiss = useDismiss(context) //  xử lý tương tác đóng popover khi người dùng nhấp ra ngoài hoặc nhấn phím Esc
    // giúp trình đọc màn hình (screen readers) hiểu được chức năng của phần tử(tăng khả năng truy cập)
    const role = useRole(context, { role: 'tooltip' })
    // Kết hợp nhiều hooks để xử lý
    const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])
    const id = useId()

    return (
        <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
            {children}
            <FloatingPortal id={id}>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            ref={refs.setFloating}
                            style={{
                                transformOrigin: `${data.middlewareData.arrow?.x}px top`,
                                ...floatingStyles
                            }}
                            {...getFloatingProps()}
                            initial={{ opacity: 0, transform: `scale(0)` }}
                            animate={{ opacity: 1, transform: `scale(1)` }}
                            exit={{ opacity: 0, transform: `scale(0)` }}
                            transition={{ duration: 0.2 }}
                        >
                            <span
                                ref={arrowRef}
                                className='absolute border-x-transparent border-t-transparent 
                                border-b-white border-[11px] translate-y-[-99%]'
                                style={{
                                    left: data.middlewareData.arrow?.x,
                                    top: data.middlewareData.arrow?.y
                                }}
                            ></span>
                            {renderPopover}
                        </motion.div>
                    )}
                </AnimatePresence>
            </FloatingPortal>
        </Element>
    )
}

export default Popover
