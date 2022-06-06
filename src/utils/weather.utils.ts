const translateCondition = (condition: string): string => {
  switch (condition) {
    case "clear sky":
      return "Céu Limpo";
    case "few clouds":
      return "Poucas Nuvens";
    case "scattered clouds":
      return "Nuvens Dispersas";
    case "broken clouds":
      return "Nuvens Carregadas";
    case "shower rain":
      return "Chuva Leve";
    case "rain":
      return "Chuva";
    case "thunderstorm":
      return "Trovoada";
    case "snow":
      return "Neve";
    case "mist":
      return "Névoa";
    default:
      return "Céu limpo"
  }
  /**
   *  Céu limpo - clear sky
      Poucas nuvens - few clouds
      Nuvens dispersas - scattered clouds
      Nuvens quebradas - broken clouds
      Chuva de banho - shower rain
      Chuva - rain
      Trovoada - thunderstorm
      Neve - snow
      Névoa - mist
   */
};

const getDayOfWeek = (day: number) => {
  switch (day) {
    case 0:
      return "Dom."
    case 1:
      return "Seg."
    case 2:
      return "Ter."
    case 3:
      return "Qua."
    case 4:
      return "Qui."
    case 5:
      return "Sex."
    case 6:
      return "Sáb."
    default:
      return "Seg."
  }
}

export { translateCondition, getDayOfWeek };