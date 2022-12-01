import React from 'react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as SC from './ContactList.styled';
import { FcPhoneAndroid } from 'react-icons/fc';
import { deleteContact } from '../../redux/operations';
// import { deleteContact, fetchContacts } from '../../redux/operations';
import {
  selectError,
  selectIsLoading,
  selectFilteredContacts,
} from '../../redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const filteredContacts = useSelector(selectFilteredContacts);
  console.log(filteredContacts);

  const delContact = contactId => {
    dispatch(deleteContact(contactId));
    // dispatch(fetchContacts());
  };

  return (
    <>
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      <SC.ContactListUl>
        {filteredContacts.map(({ name, phone, id }) => (
          <SC.ContactListLi key={id}>
            <SC.ContactCard>
              <FcPhoneAndroid />
              <SC.ContactTitle>
                {name}: {phone}
              </SC.ContactTitle>
            </SC.ContactCard>

            <SC.ButtonDelete type="button" onClick={() => delContact(id)}>
              Delete
            </SC.ButtonDelete>
          </SC.ContactListLi>
        ))}
      </SC.ContactListUl>
    </>
  );
};

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.exact({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
};
