import { ReactNode } from "react";
import { MotionValue } from "framer-motion";
import { z } from "zod";

/**
 * Props contract for ContainerScrollDevice component
 */
export interface ContainerScrollDeviceProps {
  children: ReactNode;
  titleComponent?: ReactNode | string;
  className?: string;
  deviceClassName?: string;
  screenClassName?: string;
}

/**
 * Scroll Motion Transform State contract
 */
export interface DeviceMotionState {
  rotateX: MotionValue<number>;
  scale: MotionValue<number>;
  translateY: MotionValue<number>;
}

/**
 * Responsive viewport configuration for device 3D scroll physics
 */
export interface DeviceDimensionsConfig {
  isMobile: boolean;
  scaleRange: [number, number];
  rotateRange: [number, number];
  perspective: number;
}

/**
 * Motion lifecycle specification for unmount / accessibility cleanup
 */
export interface MotionLifecycleConfig {
  shouldReduceMotion: boolean;
  cleanupStrategy: "remove-listeners" | "zero-transform";
  initial: {
    rotateX: number;
    scale: number;
    opacity: number;
  };
  animate: {
    rotateX: number;
    scale: number;
    opacity: number;
  };
  exit?: {
    opacity: number;
  };
}

/**
 * Zod Schema for ContainerScrollDevice props runtime validation
 */
export const ContainerScrollDeviceSchema = z.object({
  className: z.string().optional(),
  deviceClassName: z.string().optional(),
  screenClassName: z.string().optional(),
});
