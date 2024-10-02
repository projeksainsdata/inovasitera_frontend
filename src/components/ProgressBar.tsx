import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const progressBarVariants = cva(
    'w-full h-2 bg-gray-200 rounded-full overflow-hidden',
    {
        variants: {
            color: {
                blue: 'bg-blue-100',
                green: 'bg-green-100',
                red: 'bg-red-100',
            },
            size: {
                sm: 'h-1',
                md: 'h-2',
                lg: 'h-3',
            },
        },
        defaultVariants: {
            color: 'blue',
            size: 'md',
        },
    }
);

const progressVariants = cva(
    'h-full rounded-full transition-all duration-300 ease-in-out',
    {
        variants: {
            color: {
                blue: 'bg-blue-500',
                green: 'bg-green-500',
                red: 'bg-red-500',
            },
        },
        defaultVariants: {
            color: 'blue',
        },
    }
);

interface ProgressBarProps extends VariantProps<typeof progressBarVariants> {
    progress: number;
    showPercentage?: boolean;
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color,
    size,
    showPercentage = false,
    className,
}) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className="w-full">
            <div className={progressBarVariants({ color, size, className })}>
                <div
                    className={progressVariants({ color })}
                    style={{ width: `${clampedProgress}%` }}
                />
            </div>
            {showPercentage && (
                <div className="mt-1 text-right text-sm font-medium text-gray-700">
                    {clampedProgress.toFixed(0)}%
                </div>
            )}
        </div>
    );
};

export default ProgressBar;