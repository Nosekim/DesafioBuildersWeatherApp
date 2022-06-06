import React from 'react';
import { IconsTpeName } from './IconsType';
import ClearSkyDay from "./clearSkyDay";
import FewCloudsDay from "./fewCloudsDay";
import BrokenCloudsDay from "./brokenCloudsDay";
import ScatteredCloudsDay from "./scatteredCloudsDay";

/**
  01d = Sol
  02d = um pouco nublado
  03d = nublado
  04d = nuvens carregadas
  09d = chuva fraca
  10d = chuva
  11d = tempestade
  13d = neve
  50d = cerração
 */

interface NotificationsIconsI {
  iconType: IconsTpeName;
  color?: string;
  size: number;
}

function SvgIcons(props: NotificationsIconsI) {
  const { iconType } = props;

  switch (iconType) {
    case "01d":
      return <ClearSkyDay {...props} />
    case "02d":
      return <FewCloudsDay {...props} />
    case "03d":
      return <ScatteredCloudsDay {...props} />
    case "04d":
      return <BrokenCloudsDay {...props} />
    default:
      return <ClearSkyDay {...props} />
  }
}

export default SvgIcons;