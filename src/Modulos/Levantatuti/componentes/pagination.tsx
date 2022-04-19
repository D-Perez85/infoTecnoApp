import React from 'react'
import '../styles/pagination.scss'
import { Link } from '@material-ui/core'

type statePagination = {
    postsPerPage:any
    totalPosts:any
    paginate:any
}

const Pagination:React.FC<statePagination> = ({postsPerPage , totalPosts, paginate}) => {
   const pagesNumbers = []
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pagesNumbers.push(i)
   }

   return <nav className='nav'>
<ul className='pagination'>
    {pagesNumbers.map(number =>(
       <li key={number} className="page-item">
            <Link onClick={() => paginate(number)} href="#" className='page-link'>
                {number}
            </Link>
        </li>
    ))}
</ul>
</nav>

};

export default Pagination
