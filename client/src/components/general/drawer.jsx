import * as React from 'react';
import * as DrawerPrimitive from '@radix-ui/react-dialog';
import { cva, } from 'class-variance-authority';
import PropTypes from 'prop-types'
import { mergeClasses } from '../../lib/utils';

const Drawer = DrawerPrimitive.Root;

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerClose = DrawerPrimitive.Close;

const DrawerPortal = ({
    className,
    ...props
}) => (
    <DrawerPrimitive.Portal className={mergeClasses(className)} {...props} />
);
DrawerPortal.displayName = DrawerPrimitive.Portal.displayName;
DrawerPortal.propTypes = {
    className: PropTypes.string
}

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay
        className={mergeClasses(
            'fixed inset-0 z-50 bg-gray-900/10 opacity-100 backdrop-blur-sm',
            className
        )}
        {...props}
        ref={ref}
    />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
DrawerOverlay.propTypes = {
    className: PropTypes.string
}
const drawerVariants = cva(
    'fixed z-50 shadow-2xl bg-gray ring-1 ring-black/10 transition-all ease-in-out duration-100',
    {
        variants: {
            side: {
                right:
                    'inset-y-0 right-0 h-full max-w-xs w-full data-[state=open]:animate-drawer-open data-[state=closed]:animate-drawer-close',
            },
        },
        defaultVariants: {
            side: 'right',
        },
    }
);

const DrawerContent = React.forwardRef(({ side = 'right', className, children, ...props }, ref) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
            ref={ref}
            className={mergeClasses(drawerVariants({ side }), className)}
            {...props}
        >
            {children}
        </DrawerPrimitive.Content>
    </DrawerPortal>
));
DrawerContent.displayName = DrawerPrimitive.Content.displayName;

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent };
