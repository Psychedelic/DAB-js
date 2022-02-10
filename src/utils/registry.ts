import { DetailType, DetailValue, Metadata } from "../interfaces/dab_registries/registry_standard";

export type FormattedMetadata = Omit<Metadata, 'details'> & { details: Details };

export interface Details {
  [key: string]: DetailType;
}

export const parseDetailValue = (detailValue: DetailValue): DetailType => {
  const key = Object.keys(detailValue)[0];
  const value: DetailType = ['True', 'False'].includes(key) ? Boolean(key) : Object.values(detailValue)[0];
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

export const formatMetadata = (metadata: Metadata): FormattedMetadata => ({
  ...metadata,
  details: formatRegistryDetails(metadata.details),
});