import { Header, Page } from '@components';
import { BottomTabs, CredentialItem } from '@features';
import { useCredentials } from '@hooks/use-credentials';
import { credentialCategories } from '@enums/credential-categories';
import GovImg from '@assets/icons/gov-black.png';

const Government = () => {
  const { credentials } = useCredentials();

  return (
    <Page>
      <Header />

      <div
        style={{
          padding: '1rem',
          flex: 1,
          overflow: 'scroll',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={GovImg} style={{ height: 70, marginTop: '0.5rem' }} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflowY: 'auto',
            gap: '1rem',
            marginTop: '3.6rem',
          }}
        >
          {credentials
            .filter((c) => c.category === credentialCategories.government)
            .map((c) => (
              <CredentialItem
                key={c.id}
                title={`test credential #${c.id}`}
                credential={c}
              />
            ))}
        </div>
      </div>

      <BottomTabs />
    </Page>
  );
};

export default Government;
