var sampleResponse = {
  cookieId: "97b382ee-7ef5-4fc1-b99b-df88f7eecd90",
  ipAddress: "14.141.149.46",
  name: "Sprinklr, Inc.",
  website: "sprinklr.com",
  street: "29 West 35th Street 8th Floor",
  city: "New York",
  regionShort: "NY",
  postal: "10001",
  countryShort: "US",
  country: "United States",
  phone: "917-933-7800",
  employees: "2,500 to 5,000",
  revenue: "$250,000,000 to $500,000,000",
  sicGroup: "Business Services",
  category: "Computer Related Services, Nec",
  sicCode: "7379",
  naicsGroup: "Professional, Scientific, and Technical Services",
  category2: "Other Computer Related Services",
  naicsCode: "541519",
  latitude: 40.7499318,
  longitude: -73.9854829,
  stockSymbol: "",
  facebook: "sprinklr",
  twitter: "sprinklr",
  linkedIn: "399351",
  confidence: "77",
  isISP: "0"
};

var trackerToGAFieldMapper = {
  name: "dimension1",
  revenue: "dimension2",
  country: "dimension3",
  sicGroup: "dimension4"
};
var mapResponseToGACF = function(response) {
  if (!response) {
    return;
  }
  var trackerKey, trackerValue, GACustomDomain, gaMappingKey;
  var finalGtagMapping = {};

  for (trackerKey in trackerToGAFieldMapper) {
    trackerValue = response[trackerKey];
    gaMappingKey = trackerToGAFieldMapper[trackerKey];
    if (trackerValue && gaMappingKey) {
      finalGtagMapping[gaMappingKey] = trackerValue;
    }
  }

  gtag && gtag("event", "page_view", finalGtagMapping);
};
var init = function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://pixel-nqa.sprinklr.com/ip2json");
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        mapResponseToGACF(JSON.parse(xhr.responseText));
      } catch (e) {}
    }
  };
  xhr.send();
};

init();
