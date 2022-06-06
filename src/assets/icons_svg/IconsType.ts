const iconsType = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d', '50d'] as const;
export type IconsTpeName = typeof iconsType[number];