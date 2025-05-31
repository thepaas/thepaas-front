import { useCredentials, type Credential } from '@hooks/use-credentials';
import type { FC } from 'react';

type Props = {
  title: string;
  credential: Credential;
};

const CredentialItem: FC<Props> = ({ title, credential }) => {
  const { deleteCredential } = useCredentials();

  const deleteHandler = () => {
    const answer = window.confirm(`Delete credential #${credential.id}?`);
    if (answer) {
      deleteCredential(credential.id);
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#CFD8DC',
        borderWidth: 3,
        borderColor: '#b2bdbf',
        borderStyle: 'solid',
        borderRadius: 24,
        padding: '14px 20px',
        gap: 10,
      }}
    >
      <p style={{ fontFamily: 'Courier Prime', fontSize: 24 }}>{title}</p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          cursor: 'pointer',
        }}
        onClick={deleteHandler}
      >
        <Dot />
        <Dot />
        <Dot />
      </div>
    </div>
  );
};

export default CredentialItem;

const Dot = () => (
  <div
    style={{
      height: 15,
      width: 15,
      background: 'black',
      borderRadius: '100%',
    }}
  />
);
