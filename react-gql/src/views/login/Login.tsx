import React from 'react';

export default function Login(): React.ReactElement | null {
  return (
    <form>
      <label htmlFor="username">
        <span>username:</span>
        <input id="username" />
      </label>
      <label htmlFor="password">
        <span>username:</span>
        <input id="password" />
      </label>
      <button type="submit">submit</button>
    </form>
  );
}
