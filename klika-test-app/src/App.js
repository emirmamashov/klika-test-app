import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import { Config } from './config';

const divStyle = {
  float: 'right'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      genres: [],
      executers: [],
      years: Config.Years,
      countAllPage: 1,
      pages: [],
      filters: {
        executerId: '',
        genreId: '',
        year: 0,
        limit: 10,
        page: 1
      }
    };

    this.selectedExecuter = this.selectedExecuter.bind(this);
    this.selectedGenre = this.selectedGenre.bind(this);
    this.selectedYear = this.selectedYear.bind(this);
    this.changeStateFilters = this.changeStateFilters.bind(this);
    this.selectedLimit = this.selectedLimit.bind(this);

    this.getSongs();
    this.getGenres();
    this.getExecuters();
  }

  getSongs() {
    console.log('getSongs');
    let url = Config.ApiRoutes.songs.url + '?limit=' + this.state.filters.limit +
      '&page='+this.state.filters.page + '&executerId='+this.state.filters.executerId +
      '&genreId='+this.state.filters.genreId + '&year='+this.state.filters.year;

    axios.get(url)
      .then(response => {
        console.log('response: ', response);
        if (!response.data.success) {
          return console.log(response.data.msg);
        }
        let songs = response.data.data.docs;
        this.setState({songs: songs});
        console.log('state: ', this.state);
        this.initPaginator(this.state.filters.page, response.data.data.total);
      });
  }

  getGenres() {
    console.log('getGenres');
    axios.get(Config.ApiRoutes.genres.url)
      .then(response => {
        if (!response.data.success) {
          return console.log(response.data.msg);
        }
        this.setState({genres: response.data.data.docs});
        console.log('getGenres:', response);
        console.log('state: ', this.state);
      });
  }

  getExecuters() {
    console.log('getExecuters');
    axios.get(Config.ApiRoutes.executers.url)
      .then(response => {
        if (!response.data.success) {
          return console.log(response.data.msg);
        }
        this.setState({executers: response.data.data.docs});
        console.log('getExecuters:', response);
        console.log('state: ', this.state);
      });
  }

  changeStateFilters(filters) {
    this.setState({ filters: filters });
    console.log('filters: ', this.state.filters);
    this.getSongs();
  }

  selectedExecuter(event) {
    let filters = this.state.filters;
    filters.executerId = event.target.value;
    this.changeStateFilters(filters);
  }

  selectedGenre(event) {
    let filters = this.state.filters;
    filters.genreId = event.target.value;
    this.changeStateFilters(filters);
  }

  selectedYear(event) {
    let filters = this.state.filters;
    filters.year = event.target.value;
    this.changeStateFilters(filters);
  }

  selectedLimit(limit) {
    if (!limit || !Number(limit)) return console.log('not correct limit');
    let filters = this.state.filters;
    filters.limit = limit;
    this.changeStateFilters(filters);
  }

  prevPage(event) {
    let filters = this.state.filters;
    filters.page--;
    this.changeStateFilters(filters);
  }

  nextPage(event) {
    let filters = this.state.filters;
    filters.page++;
    this.changeStateFilters(filters);
  }

  toPage(page) {
    if (!page || !Number(page)) return;
  
    let filters = this.state.filters;
    filters.page = page;
    this.changeStateFilters(filters);
  }

  initPaginator(page, count) {
    const pages = Math.ceil(count / this.state.filters.limit);
    let allPages = [];
    let filters = this.state.filters;
    console.log('initPaginator: ', page, this.state.filters.limit, count, pages);
    if (pages < 1) {
      const paginator = {};
      paginator.pageNumber = 1;
      paginator.isCurrent = true;
      //allPages.push(paginator);
      filters.page = 1;

      this.setState({ pages: allPages, countAllPage: 1, filters: filters });
      console.log('state: ', this.state);
      return;
    }
    //this.state.countAllPage = pages;
    filters.page = page;
    if (this.state.countAllPage > 5) {
      let maxPage = this.state.filters.page + 4;
      if (maxPage > this.state.countAllPage) {
        maxPage = this.state.countAllPage;
      }

      for (let i = this.state.filters.page; i <= maxPage; i++) {
        const paginator = {};
        paginator.pageNumber = i;
        if (i === this.state.filters.page) {
          paginator.isCurrent = true;
        }
        allPages.push(paginator.pageNumber===this.state.filters.page ?
          <li className="page-item active" key={paginator}>
            <a className="page-link" onClick={(e) => this.toPage(paginator.pageNumber)}>{paginator.pageNumber}</a>
          </li>
          :<li className="page-item" key={paginator}>
          <a className="page-link" onClick={(e) => this.toPage(paginator.pageNumber)}>{paginator.pageNumber}</a></li>);
      }
      this.setState({ pages: allPages, countAllPage: pages, filters: filters });
      console.log('state: ', this.state);
      return;
    }

    for (let i = 1; i <= pages; i++) {
      const paginator = {};
      paginator.pageNumber = i;
      if (i === this.state.filters.page) {
        paginator.isCurrent = true;
      }
      allPages.push(paginator.pageNumber===this.state.filters.page ?
        <li className="page-item active" key={paginator}>
          <a className="page-link" onClick={(e) => this.toPage(paginator.pageNumber)}>{paginator.pageNumber}</a>
        </li>
        :<li className="page-item" key={paginator}>
        <a className="page-link" onClick={(e) => this.toPage(paginator.pageNumber)}>{paginator.pageNumber}</a></li>);
    }

    this.setState({ pages: allPages, countAllPage: pages, filters: filters });
    console.log('state: ', this.state);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br/>

        <div className="App-intro container">
          <div className="row">
            <div className="col-md-8">
              <h3>Плейлист</h3>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Исполнитель</th>
                    <th scope="col">Песня</th>
                    <th scope="col">Жанр</th>
                    <th scope="col">Год</th>
                  </tr>
                </thead>
                <ListSongs songs={this.state.songs}/>
              </table>
              <div className="row">
                <div className="col-md-7">
                {
                  this.state.countAllPage>1 ?
                  <ul className="pagination">
                    {
                      this.state.filters.page <= 1 ?
                      <li className="page-item disabled">
                        <a className="page-link" href="#">&laquo;</a>
                      </li>
                      :<li className="page-item">
                        <a className="page-link" href="#" onClick={(e) => this.prevPage(e)}>&laquo;</a>
                      </li>
                    }
                    
                    {this.state.pages}
                    {
                      this.state.countAllPage === this.state.filters.page ?
                      <li className="page-item disabled">
                        <a className="page-link" href="#">&raquo;</a>
                      </li>
                      :<li className="page-item">
                        <a className="page-link" href="#" onClick={(e) => this.nextPage(e)}>&raquo;</a>
                      </li>
                    }
                  </ul>
                  :''
                }
                </div>
                <div className="col-md-5">
                  <ul className="pagination" style={divStyle}>
                  {
                    this.state.filters.limit === 10 ?
                    <li className="page-item active">
                      <a className="page-link" href="#" onClick={(e) => this.selectedLimit(10) }>10</a>
                    </li>:
                    <li className="page-item">
                      <a className="page-link" href="#" onClick={(e) => this.selectedLimit(10) }>10</a>
                    </li>
                  }
                  {
                    this.state.filters.limit === 25 ?
                    <li className="page-item active">
                      <a className="page-link" href="#" onClick={(e) => this.selectedLimit(25) }>25</a>
                    </li>:
                    <li className="page-item">
                      <a className="page-link" href="#" onClick={(e) => this.selectedLimit(25) }>25</a>
                    </li>
                  }
                  {
                    this.state.filters.limit === 50 ?
                    <li className="page-item active">
                      <a className="page-link" href="#" onClick={(e) => this.selectedLimit(50) }>50</a>
                    </li>:
                    <li className="page-item">
                      <a className="page-link" href="#" onClick={(e) => this.selectedLimit(50) }>50</a>
                    </li>
                  }
                  {
                    this.state.filters.limit === 100 ?
                    <li className="page-item active">
                      <a className="page-link" href="#" onClick={(e) => this.selectedLimit(100) }>100</a>
                    </li>:
                    <li className="page-item">
                      <a className="page-link" href="#" onClick={(e) => this.selectedLimit(100) }>100</a>
                    </li>
                  }
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <h3>Фильтр</h3>
              <hr/>
              <div className="form-group">
                <label>Испольнитель</label>
                <select className="form-control" onChange={this.selectedExecuter}>
                  <option selected value="">Все</option>
                  <ListSelectList items={this.state.executers}/>
                </select>
              </div>
              <div className="form-group">
                <label>Жанр</label>
                <select className="form-control" onChange={this.selectedGenre}>
                  <option selected value="">Все</option>
                  <ListSelectList items={this.state.genres}/>
                </select>
              </div>
              <div className="form-group">
                <label>Год</label>
                <select className="form-control" onChange={this.selectedYear}>
                  <option selected value="">Все</option>
                  <ListSelectList items={this.state.years}/>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

class ListSongs extends Component {
  render() {
    return (
      <tbody>
        {this.props.songs.map(song => (
          <tr key={song._id}>
            <td>{song.executerId.name}</td>
            <td>{song.name}</td>
            <td>{song.genreId.name}</td>
            <td>{song.year}</td>
          </tr>
        ))}
      </tbody>
    );
  }
}

class ListSelectList extends Component {
  render() {
    return (
      this.props.items.map(item => (
        <option key={item._id} value={item._id}>{item.name?item.name:item}</option>
      ))
    );
  }
}

class PageList extends Component {
  render() {
    return (
      this.props.pages.map(page => (
        page.pageNumber===this.props.page ?
        <li className="page-item active" key={page}>
          <a className="page-link" onClick={(e) => this.toPage(page.pageNumber)}>{page.pageNumber}</a>
        </li>
        :<li className="page-item" key={page}>
        <a className="page-link" onClick={(e) => this.toPage(page.pageNumber)}>{page.pageNumber}</a>
      </li>
      ))
    );
  }
}