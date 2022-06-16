import React from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useBoundary } from '../../components/ErrorBoundary/useBoundary';
import { UserIndexListQuery } from './__generated__/UserIndexListQuery.graphql';

export default function UserIndex(): React.ReactElement | null {
  const fetchKey = useBoundary();
  const { users } = useLazyLoadQuery<UserIndexListQuery>(
    graphql`
      query UserIndexListQuery {
        users {
          id
          name
          age
          male
        }
      }
    `,
    {},
    { fetchKey },
  );
  return (
    <>
      <h1>User Index</h1>
      <div>
        {users.map((x) => (
          <div key={x.id}>
            {x.id} {x.name} {x.age} {x.male ? '男' : '女'}
          </div>
        ))}
      </div>
    </>
  );
}
