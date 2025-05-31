import { useCallback, useEffect, useState } from 'react';

import type { CredentialCategories } from 'enums/credential-categories';

const CREDENTIALS_KEY = 'CREDENTIALS_KEY';

export type Credential = {
  id: number;
  credential: string;
  category: CredentialCategories;
};

export type CreateCredentialData = {
  credential: string;
  category: CredentialCategories;
};

export const useCredentials = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  const addCredential = useCallback((newCredential: CreateCredentialData) => {
    const credentialsStorageItem = JSON.parse(
      localStorage.getItem(CREDENTIALS_KEY) ?? '[]'
    ) as Credential[];

    const id = credentialsStorageItem.length
      ? credentialsStorageItem[credentialsStorageItem.length - 1].id + 1
      : 0;

    const credential = { ...newCredential, id };

    const credentials = [...credentialsStorageItem, credential];
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    setCredentials((p) => [...p, credential]);
  }, []);

  const deleteCredential = useCallback((credentialId: number) => {
    const credentialsStorageItem = JSON.parse(
      localStorage.getItem(CREDENTIALS_KEY) ?? '[]'
    ) as Credential[];

    const updatedCredentials = credentialsStorageItem.filter(
      (c) => c.id !== credentialId
    );

    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(updatedCredentials));
    setCredentials(updatedCredentials);
  }, []);

  // get credentials from storage
  useEffect(() => {
    const credentials = JSON.parse(
      localStorage.getItem(CREDENTIALS_KEY) ?? '[]'
    );

    if (!credentials.length) return;

    setCredentials(credentials);
  }, []);

  return {
    credentials,
    addCredential,
    deleteCredential,
  };
};
