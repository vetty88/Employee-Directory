import React from 'react';
import Axios from 'axios';
//define states

export default class EmpList extends React.Component {
    state = {
        persons: [],
        search: '',
        filteredPersons: '',
        sort: '',
        order: ''
    }

    //mount axios request for api data
    componentDidMount() {
        Axios.get("https://randomuser.me/api/?results=100&nat=us").then(res => {
            this.setState({persons: res.data.results});
        });
    }
    // event handlers
    updateSearch(event) {
        this.setState({search: event.target.value.substr(0,10)});
    }
    sortChange(event) {
        this.setState({sort: event.target.value});
    }
    orderChange(event) {
        this.setState({
            order: event.target.value});
        }
    // filter data and render it into a html file through jsx

    render () {
        let filteredPersons= this.state.persons.filter ((persons) => {
                return persons.name.first.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        let list= '';
        switch (this.state.sort) {
            case 'age':
                list= filteredPersons.sort((a, b) => a.dob.age > b.dob.age ? 1 : -1);
                break;
            case 'name':
                list= filteredPersons.sort((a, b) => a.name.first > b.name.first ? 1 : -1);
                break;
            default:
                list= filteredPersons;
        }

        let orderedList= '';
        switch (this.state.order) {
            case 'reverse':
                orderedList= list.reverse();
                break;
            default:
                orderedList= list;
        }

        return (
            <div className= "empBody">
                
            <div className= 'searchBar'>
                <div className= 'card'> <label> First Name Search </label>
                    <input type= "text" id= 'nameSearch' value= {this.state.search} 
                    onChange= {this.updateSearch.bind (this)}/> 
            </div>

            <div className= 'card'>
                <label> Sort By </label> 
                    <select value= {this.state.value} onChange = {this.sortChange.bind(this)}> 
                        <option value= ""> default </option>
                        <option value= "age"> Age </option> 
                        <option value= "name"> First Name </option> 
                    </select> 
            </div>

            <div className= 'card'>
                <label> Order: </label> 
                    <select value= {this.state.value} onChange = {this.orderChange.bind(this)}>
                        <option value= "null"> Asc </option> 
                        <option value= "reverse"> Desc </option> 
                    </select> 
            </div>   
            </div>

                {orderedList.map(function (person, i) {
                    return <div key= {i} className = "empBlock">
                       <p> <img src= {person.picture.medium} alt =''/> 
                            <strong> {person.name.first} {person.name.last} </strong>  /  PH: {person.cell}  /  E: {person.email}  /  {person.location.city}, {person.location.state} 
                            </p>
                        </div>
                           
            
            }
            )} 
            
        </div>

            )
        }
    }