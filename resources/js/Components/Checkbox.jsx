export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-slate-300 text-gold-600 shadow-sm focus:border-gold-500 focus:ring-gold-500 dark:border-white/10 dark:bg-slate-900/50 dark:focus:ring-gold-600 dark:focus:ring-offset-neutral-950 ' +
                className
            }
        />
    );
}
