import React from 'react';
import Sun from "./sun";

interface NotificationsIconsI {
  iconType: string;
  color?: string;
  size: number;
}

function SvgIcons(props: NotificationsIconsI) {
  const { iconType } = props;

  switch (iconType) {
    case "sun":
      return <Sun {...props} />
    default:
      return <Sun {...props} />
  }
}

export default SvgIcons;