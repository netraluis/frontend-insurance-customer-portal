export interface Country {
    name: string
    code: string
    dialCode: string
    flag: string
  }
  
  export const countries: Country[] = [
    {
      name: "Afganistan",
      code: "AF",
      dialCode: "+93",
      flag: "🇦🇫",
    },
    {
      name: "Illes Åland",
      code: "AX",
      dialCode: "+358",
      flag: "🇦🇽",
    },
    {
      name: "Albània",
      code: "AL",
      dialCode: "+355",
      flag: "🇦🇱",
    },
    {
      name: "Algèria",
      code: "DZ",
      dialCode: "+213",
      flag: "🇩🇿",
    },
    {
      name: "Samoa Americana",
      code: "AS",
      dialCode: "+1",
      flag: "🇦🇸",
    },
    {
      name: "Andorra",
      code: "AD",
      dialCode: "+376",
      flag: "🇦🇩",
    },
    {
      name: "Angola",
      code: "AO",
      dialCode: "+244",
      flag: "🇦🇴",
    },
    {
      name: "Anguilla",
      code: "AI",
      dialCode: "+1",
      flag: "🇦🇮",
    },
    {
      name: "Antigua i Barbuda",
      code: "AG",
      dialCode: "+1",
      flag: "🇦🇬",
    },
    {
      name: "Argentina",
      code: "AR",
      dialCode: "+54",
      flag: "🇦🇷",
    },
    {
      name: "Armènia",
      code: "AM",
      dialCode: "+374",
      flag: "🇦🇲",
    },
    {
      name: "Aruba",
      code: "AW",
      dialCode: "+297",
      flag: "🇦🇼",
    },
    {
      name: "Austràlia",
      code: "AU",
      dialCode: "+61",
      flag: "🇦🇺",
    },
    {
      name: "Àustria",
      code: "AT",
      dialCode: "+43",
      flag: "🇦🇹",
    },
    {
      name: "Azerbaijan",
      code: "AZ",
      dialCode: "+994",
      flag: "🇦🇿",
    },
    {
      name: "Bahames",
      code: "BS",
      dialCode: "+1",
      flag: "🇧🇸",
    },
    {
      name: "Bahrain",
      code: "BH",
      dialCode: "+973",
      flag: "🇧🇭",
    },
    {
      name: "Bangladesh",
      code: "BD",
      dialCode: "+880",
      flag: "🇧🇩",
    },
    {
      name: "Barbados",
      code: "BB",
      dialCode: "+1",
      flag: "🇧🇧",
    },
    {
      name: "Bielorússia",
      code: "BY",
      dialCode: "+375",
      flag: "🇧🇾",
    },
    {
      name: "Bèlgica",
      code: "BE",
      dialCode: "+32",
      flag: "🇧🇪",
    },
    {
      name: "Belize",
      code: "BZ",
      dialCode: "+501",
      flag: "🇧🇿",
    },
    {
      name: "Benín",
      code: "BJ",
      dialCode: "+229",
      flag: "🇧🇯",
    },
    {
      name: "Bermudes",
      code: "BM",
      dialCode: "+1",
      flag: "🇧🇲",
    },
    {
      name: "Bhutan",
      code: "BT",
      dialCode: "+975",
      flag: "🇧🇹",
    },
    {
      name: "Bolívia",
      code: "BO",
      dialCode: "+591",
      flag: "🇧🇴",
    },
    {
      name: "Bosnia i Hercegovina",
      code: "BA",
      dialCode: "+387",
      flag: "🇧🇦",
    },
    {
      name: "Botswana",
      code: "BW",
      dialCode: "+267",
      flag: "🇧🇼",
    },
    {
      name: "Brasil",
      code: "BR",
      dialCode: "+55",
      flag: "🇧🇷",
    },
    {
      name: "Territori Britànic de l'Oceà Índic",
      code: "IO",
      dialCode: "+246",
      flag: "🇮🇴",
    },
    {
      name: "Illes Verges Britàniques",
      code: "VG",
      dialCode: "+1",
      flag: "🇻🇬",
    },
    {
      name: "Brunei",
      code: "BN",
      dialCode: "+673",
      flag: "🇧🇳",
    },
    {
      name: "Bulgària",
      code: "BG",
      dialCode: "+359",
      flag: "🇧🇬",
    },
    {
      name: "Burkina Faso",
      code: "BF",
      dialCode: "+226",
      flag: "🇧🇫",
    },
    {
      name: "Burundi",
      code: "BI",
      dialCode: "+257",
      flag: "🇧🇮",
    },
    {
      name: "Cambodia",
      code: "KH",
      dialCode: "+855",
      flag: "🇰🇭",
    },
    {
      name: "Camerun",
      code: "CM",
      dialCode: "+237",
      flag: "🇨🇲",
    },
    {
      name: "Canadà",
      code: "CA",
      dialCode: "+1",
      flag: "🇨🇦",
    },
    {
      name: "Capo Verde",
      code: "CV",
      dialCode: "+238",
      flag: "🇨🇻",
    },
    {
      name: "Espanya",
      code: "ES",
      dialCode: "+34",
      flag: "🇪🇸",
    },
    {
      name: "Regne Unit",
      code: "GB",
      dialCode: "+44",
      flag: "🇬🇧",
    },
    {
      name: "Estats Units",
      code: "US",
      dialCode: "+1",
      flag: "🇺🇸",
    },
  ]
  
  export const getCountryByCode = (code: string): Country | undefined => {
    return countries.find((country) => country.code === code)
  }
  
  export const getCountryByDialCode = (dialCode: string): Country | undefined => {
    return countries.find((country) => country.dialCode === dialCode)
  }
  
  export const validatePhoneNumber = (phoneNumber: string, country: Country): boolean => {
    // Basic validation - can be enhanced with more specific country rules
    if (!phoneNumber) return false
  
    // Remove spaces, dashes, and parentheses
    const cleanNumber = phoneNumber.replace(/[\s\-$$$$]/g, "")
  
    // Check if the number starts with the country code
    if (cleanNumber.startsWith(country.dialCode.replace("+", ""))) {
      return cleanNumber.length >= country.dialCode.length + 4
    }
  
    // If the number doesn't include the country code, check minimum length
    return cleanNumber.length >= 4
  }
  