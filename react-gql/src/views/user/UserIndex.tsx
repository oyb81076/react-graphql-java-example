import React from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import useRefresh from '../../hooks/useRefresh';
import { UserIndexListQuery } from './__generated__/UserIndexListQuery.graphql';

export default function UserIndex(): React.ReactElement | null {
  const beforeCount = React.useRef(0);
  const afterCount = React.useRef(0);
  const [options, refresh] = useRefresh();
  beforeCount.current++;
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
    options,
  );
  afterCount.current++;
  return (
    <>
      <h1>User Index</h1>
      <div>before: {beforeCount.current}</div>
      <div>after: {afterCount.current}</div>
      <Child />
      <div>
        {users.map((x) => (
          <div key={x.id}>
            {x.id} {x.name} {x.age} {x.male ? '男' : '女'}
          </div>
        ))}
      </div>
      <button type="button" onClick={refresh}>
        refresh
      </button>
    </>
  );
}

function Child() {
  const render = React.useRef(0);
  render.current++;
  return <div>Child: {render.current}</div>;
}
