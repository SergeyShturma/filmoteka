import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/__pagination.scss';
import { getTrendingMovies } from './api';

const container = document.getElementById('tui-pagination-container');

const pagination = new Pagination(container, {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 10,
  page: 1,
  centerAlign: true,
});

const page = pagination.getCurrentPage();

export function fetch() {
  getTrendingMovies(page).then(data => {
    pagination.reset();
  });
}

fetch();

export function paginationOn() {
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    console.log(currentPage);
    getTrendingMovies(currentPage).then(data => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  });
}

paginationOn();

export { pagination };
