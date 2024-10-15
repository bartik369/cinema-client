/// <reference types="react-scripts" />

declare module '*.mp4' {
    const src: string;
    export default src;
  }
declare module "*.module.css";
declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}