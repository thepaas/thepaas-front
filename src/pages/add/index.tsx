import { useCallback, useEffect, useState } from 'react';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { toast } from 'react-toastify';

import scannerIcon from '@assets/icons/scanner.svg';
import { Header, Page } from '@components';
import { BottomTabs } from '@features';
import CategorySelect from './components/category-select';
import { type CredentialCategories } from '@enums/credential-categories';
import { useCredentials } from '@hooks/use-credentials';

const Add = () => {
  const { addCredential } = useCredentials();

  const [selectedCategory, setSelectedCategory] =
    useState<CredentialCategories>('government');

  const [credentialValue, setCredentialValue] = useState<string>();

  const onScan = (result: IDetectedBarcode[]) => {
    const data = result[0]?.rawValue;
    if (!data) throw new Error('No submit proof url');

    setCredentialValue(data);
    toast.success('Credential added successfully');
  };

  const onChange = useCallback((selectedCategory: CredentialCategories) => {
    setSelectedCategory(selectedCategory);
  }, []);

  // save credential
  useEffect(() => {
    if (!credentialValue) return;

    addCredential({
      credential: credentialValue,
      category: selectedCategory,
    });
    setCredentialValue(undefined);
  }, [credentialValue, selectedCategory, addCredential]);

  return (
    <Page>
      <Header />

      <div style={{ padding: '1rem' }}>
        <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>
          choose category
        </h1>

        <div style={{ marginTop: '1rem' }}>
          <div
            style={{
              position: 'relative',
              border: '6px solid #b2bdbf',
              borderRadius: 24,
              overflow: 'hidden',
            }}
          >
            <Scanner
              components={{ finder: false }}
              onScan={onScan}
              sound={false}
              styles={{ container: { width: '100%', height: '290px' } }}
            />
            <img
              src={scannerIcon}
              style={{
                height: 100,
                width: 100,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <CategorySelect value={selectedCategory} onChange={onChange} />
          </div>
        </div>
      </div>

      <BottomTabs />
    </Page>
  );
};

export default Add;
