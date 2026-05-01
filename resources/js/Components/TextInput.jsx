import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full rounded-[1rem] border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition-colors focus:border-gold-500 focus:ring-gold-500 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100 dark:focus:border-gold-500 dark:focus:ring-gold-500 ' +
                className
            }
            ref={localRef}
        />
    );
});
