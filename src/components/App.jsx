import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './form/Form';
import { FilterField } from './filter/FilterField';
import ContactList from './contacts/ContactList';
import { Header } from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    // name: '',
    // number: ''
  };

  submitForm = e => {
    e.preventDefault();
    if (
      !!this.state.contacts.find(
        contact => contact.name === e.target.name.value
      )
    ) {
      alert(`${e.target.name.value} is already in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name: e.target.name.value,
      number: e.target.number.value,
    };
    this.setState(prev => ({ contacts: [...prev.contacts, contact] }));
    e.currentTarget.reset();
  };

  searchFunc = e => {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  };

  delFunc = e => {
    this.setState(prev => {
      return {
        contacts: prev.contacts.filter(
          contact => contact.id !== e.target.parentNode.dataset.key
        ),
      };
    });
  };

  render() {
    return (
      <>
        <Header>PhoneBook</Header>
        <Form submitForm={this.submitForm} />

        <Header>Contacts</Header>
        <FilterField searchFunc={this.searchFunc} />

        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          delFunc={this.delFunc}
        />
      </>
    );
  }
}

export { App };
