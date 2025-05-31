import { Header, Page } from '@components';
import { BottomTabs, CredentialItem } from '@features';
import { useCredentials } from '@hooks/use-credentials';
import TicketImg from '@assets/icons/ticket-black.png';
import { credentialCategories } from '@enums/credential-categories';

const Events = () => {
  const { credentials } = useCredentials();

  return (
    <Page>
      <Header />

      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={TicketImg} style={{ height: 70, marginTop: '0.5rem' }} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '3.6rem',
          }}
        >
          {credentials
            .filter((c) => c.category === credentialCategories.events)
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

export default Events;
