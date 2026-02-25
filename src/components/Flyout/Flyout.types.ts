import { HTMLAttributes, ReactNode } from 'react';
import type { ContainerProps } from '@/components/Container';
import type { DialogProps } from '@/components/Dialog';

export type FlyoutProps = DialogProps;

export interface FlyoutTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /** The content of the trigger */
  children: ReactNode;
}

type FlyoutSizeType = 'default' | 'narrow' | 'wide' | 'widest';
type FlyoutStrategy = 'relative' | 'absolute' | 'fixed';
type FlyoutType = 'default' | 'inline';
type FlyoutAlignmentType = 'start' | 'end';

export interface FlyoutContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  container?: HTMLElement | null;
  showOverlay?: boolean;
  size?: FlyoutSizeType;
  type?: FlyoutType;
  strategy?: FlyoutStrategy;
  closeOnInteractOutside?: boolean;
  width?: string;
  align?: FlyoutAlignmentType;
  onInteractOutside?: (event: CustomEvent) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: CustomEvent) => void;
  onFocusOutside?: (event: CustomEvent) => void;
}

export interface FlyoutHeaderProps extends ContainerProps<'div'> {
  title: string;
}

export interface FlyoutFooterProps {
  children: ReactNode;
}
