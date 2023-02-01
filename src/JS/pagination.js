import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/__pagination.scss';
import { renderTrendCardMarkup } from './api';

const container = document.getElementById('tui-pagination-container');

let pagination = new Pagination(container, {
  visiblePages: 3,
  totalItems: 100,
  itemsPerPage: 20,
  page: 1,
  centerAlign: true,
});

const page = pagination.getCurrentPage();
renderTrendCardMarkup(page || 1).then(total_results => {
  pagination.setTotalItems(total_results);
});

pagination.on('afterMove', event => {
  const currentPage = event.page;

  renderTrendCardMarkup(currentPage);

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
