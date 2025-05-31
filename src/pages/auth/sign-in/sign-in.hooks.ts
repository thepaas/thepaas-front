import { useEffect, useState } from 'react';
import { useAccount } from '@starknet-react/core';
import { useNavigate } from 'react-router-dom';

import { generateNonce, signIn, signUp } from './sign-in.api';
import { routes } from '@configs';

export const useAuthorization = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { account } = useAccount();

  useEffect(() => {
    if (!account) return;

    (async () => {
      try {
        setIsLoading(true);
        await signUp(account.address);

        const result = await generateNonce(account.address);
        if (!result) return;

        await signIn(account, result.jwt, result.nonce);
        navigate(routes.home.path);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [account, navigate]);

  return { isLoading };
};
