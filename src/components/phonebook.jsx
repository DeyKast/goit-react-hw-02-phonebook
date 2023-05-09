import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContactForm from './PhonebookComponents/ContactForm';
import ContactList from './PhonebookComponents/ContactList';
import Filter from './PhonebookComponents/Filter';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    const { contacts } = this.state;
    const isDuplicate = contacts.some(
      contact => contact.name === newContact.name
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts !`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  setFilter = filterValue => {
    this.setState({ filter: filterValue });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter setFilter={this.setFilter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

Phonebook.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  addContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Phonebook;
