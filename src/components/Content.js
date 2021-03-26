import React, { useState, useEffect } from 'react'
import './content.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsisH, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Card, CardDeck } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Content() {
    const itemPerPage = 4; //variabel jumlah card yang akan ditampilkan
    const [currentPage, setCurrentPage] = useState(0); //variable tipe integer untuk menentukan sedang menampilkan data ke berapa
    const [personnel, setPersonnel] = useState([]); //variabel array untuk menyimpan data dari API
    const [prevStat, setPrev] = useState(true); //variabel tipe boolean untuk mengaktifkan atribut disable pada button previous
    const [nextStat, setNext] = useState(false); //variable tipe boolean untuk mengaktifkan atribut diasable pada button next
    const [searchName, setSearchName] = useState(""); //variabel tipe string untuk menyimpan nama yang dicari dari input
    const [searchResults, setSearchResults] = useState([]); //variabel array untuk menyimpan data yang difilter melalui input nama depan
    const [isSearching, setIsSearching] = useState(true); //variabel untuk menampilkan card mana yang akan ditampilkan


    //useEffect untuk melakukan fetching data saat browser direfresh
    useEffect(() => {
        axios.get( "https://randomuser.me/api/?results=24")
            .then(res => {
                console.log(res)
                setPersonnel(res.data.results);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    //currentData merupakan fungsi untuk menentukan pemotongan tampilan sehingga
    //hanya menampilkan 4 card saja 
    function currentData() {
        const begin = currentPage; //begin akan berisi data ke berapa yang sedang ditampilkan
        const end = begin + itemPerPage; //end berisi maksimal data ke berapa yang akan ditampilkan 
        console.log(begin, end);
        return personnel.slice(begin, end); //menghasilkan jumlah card yang ditampilkan sesuai parameter yang diberikan
    }

    //currentDataSearch fungsinya sama dengan currentData
    //hanya saja untuk card yang dicari namanya lewat search
    function currentDataSearch() {
        const begin = currentPage; //begin akan berisi data ke berapa yang sedang ditampilkan
        const end = begin + itemPerPage; //end berisi maksimal data ke berapa yang akan ditampilkan 
        console.log(begin, end);
        return searchResults.slice(begin, end); //menghasilkan jumlah card yang ditampilkan sesuai parameter yang diberikan
    }

    //previous adalah fungsi untuk menampilkan 4 card sebelumnya
    function previous() {
        setCurrentPage((currentPage) => Math.min(currentPage - 4)); //variabel currentPage akan dikurangi 4
        if(currentPage - 4 === 0) { //jika currentPage sama 0 maka button next akan didisabled
            setPrev(true);
            setNext(false);
        }
    }

    //next adalah fungsi untuk menampilkan 4 card setelahnya
    function next() {
        let isClick = false;
        setCurrentPage((currentPage) => Math.max(currentPage + 4)); //variabel currentPage akan ditambahkan 4
        if(currentPage + 8 === 24) { //jika currentPage sama dengan 24 maka button next akan didisabled
            setNext(true);
        } 

        if(isClick === false) { //jika pada 4 tampilan card pertama button next diklik maka saat berpindah button previous sudah tidak didisabled lagi
            setPrev(false);
            isClick = true;
        }
    }

    //handleChange akan menerima data dari input yaitu nama yang akan dicari 
    //dan nama tersebut akan disimpan pada useState searchName melalui fungisi setSearchName
    const handleChange = event => {
        setSearchName(event.target.value);
    }

    //find merupakan fungsi untuk mencari nama dari input search
    function find() {
        const results = personnel.filter(p => //filter untuk menyaring nama sesuai dengan membangindan searchName dengan data API p.name.first
            p.name.first.toLowerCase().includes(searchName.toLowerCase())
        );
        setSearchResults(results);
        if(results.length !== 0) { //jika result ditemukan maka yang akan dirender html untuk tampilan search
            setIsSearching(false);
            setCurrentPage(0);
        } else { //jika result tidak ditemukan tampilan search tidak akan dirender
            setCurrentPage(0);
            currentData();
            setIsSearching(true);
        }
    }

    //renderedPersonnel merupakan tampilan data card sebelum dilakukan pencarian/filter nama depan
    const renderedPersonnel = currentData().map((p, index) => {
        return (
            <Card key={index} className="card">
                <Card.Header id="header">Personnel ID: {index} <FontAwesomeIcon icon={faEllipsisH} style={{"float":"right"}} /></Card.Header>
                <Card.Body id="body">
                    <Card.Img id="imgCard" variant="top" src={p.picture.medium} /><br/><br/>
                    <Card.Text><b>Name</b><br/>{p.name.first} {p.name.last}</Card.Text>
                    <Card.Text><b>Telephone</b><br/>{p.phone}</Card.Text>
                    <Card.Text><b>Birthday</b><br/>{p.registered.date}</Card.Text>
                    <Card.Text><b>Email</b><br/>{p.email}</Card.Text>
                </Card.Body>
            </Card>
        )
    });


    //renderedPersonnel merupakan tampilan data card setelah dilakukan pencarian/filter nama depan
    const renderedSearch = currentDataSearch().map((p, index) => {
        return (
            <Card key={index} className="card">
                <Card.Header>Personnel ID: {index} <FontAwesomeIcon icon={faEllipsisH} style={{"float":"right"}} /></Card.Header>
                <Card.Body>
                    <Card.Img id="imgCard" variant="top" src={p.picture.medium} /><br/><br/>
                    <Card.Text><b>Name</b><br/>{p.name.first} {p.name.last}</Card.Text>
                    <Card.Text><b>Telephone</b><br/>{p.phone}</Card.Text>
                    <Card.Text><b>Birthday</b><br/>{p.registered.date}</Card.Text>
                    <Card.Text><b>Email</b><br/>{p.email}</Card.Text>
                </Card.Body>
            </Card>
        )
    });

    return (
        <div>
            <div className="containerSearch">
                <div id="titleDiv">
                    <h1 style={{"color":"turquoise"}}>Personel List</h1>
                    <h5 style={{"color":"grey"}}>List of all personnels</h5>
                </div>
                <div id="searchDiv">
                    <input id="searchInput" type="text" name="search" placeholder="Find Personnels"
                    value={searchName}
                    onChange={handleChange} />
                    <button id="searchBtn" onClick={find}>ADD PERSONNEL <FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </div>
            <CardDeck className="containerCard">
                {isSearching? renderedPersonnel : renderedSearch}
            </CardDeck>
            <div className="buttonPages">
                <button id="btnPrev" onClick={previous} disabled={prevStat}><FontAwesomeIcon icon={faChevronLeft} /> Previous Page</button>
                <button id="btnNext" onClick={next} disabled={nextStat}>Next Page <FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
        </div>
    )
}

