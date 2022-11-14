import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Error = ({ children }) => <Span>{children}</Span>;

Error.propTypes = {
 children: PropTypes.node
};

const Span = styled.span`
  font-size: 0.7rem;
  color: var(--color-error);
`;
