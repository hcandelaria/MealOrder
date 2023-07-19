'use client';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

function Demo({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default withAuthenticator(Demo);
