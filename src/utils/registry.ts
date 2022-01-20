import { DetailType, DetailValue, Metadata } from "../interfaces/registry_standard";

export type FormattedMetadata = Omit<Metadata, 'details'> & { details: Details };

export interface Details {
  [key: string]: DetailType;
}

export const parseDetailValue = (detailValue: DetailValue): DetailType => {
  const value: DetailType = Object.values(detailValue)[0];
  if (Array.isArray(value)) {
    return value.map((v) => typeof value === 'number' ? v : parseDetailValue(v));
  }
  return value;
};

export const formatRegistryDetails = (details: Metadata['details']): Details => {
  const formattedDetails: Details = {};
  for (const [key, detailValue] of details) {
    formattedDetails[key] = parseDetailValue(detailValue);
  }
  return formattedDetails;
};