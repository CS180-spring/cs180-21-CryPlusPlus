'use client';
import Link from 'next/link'
import './page.css'

const Home = () => {
  return (
    <div className='page_container'>
      <div id='spinning_cat_intro'></div>
      <nav className='px-16'>
        {/* <li>LOGO</li> */}
        <li><a href='#feats_sec'>Features</a></li>
        <li><a href='#ups_sec'>Updates</a></li>
        {/* <li><a href='#prices'>Pricing</a></li> */}
        {/* <li><a href='#res_sec'>Resources</a></li> */}
        <li id="try_now_button"><Link href='main'> Try Now</Link></li>
      </nav>

      <div className='overview_section'>
        <div id="overview_left">
          <h1>Work Smarter</h1>
          <p>Cry++ is a database for developers and users alike that prioritizes efficiency and having quick and secure access to your data. With a multitude of features it is the leading service in data management services</p>
        </div>
        <div id="overview_right">
          <Link className='overview_links' href="../README.md">Documentation</Link>
          <Link className='overview_links' href='main'> Use CryDB </Link>
        </div>
      </div>
      <h2>FEATURES</h2>
      <div id="feats_sec" className='features_section'>
        <div className='feature'>
          <div className='feature_left'><h1>CRUD</h1><p>Ability to: Create, Read, Update, and Delete files from database
</p></div>
          <div className='feature_right'>IMAGE OF FEATURE</div>
        </div>
        <div className='feature'>
          <div className='feature_left'><h1>EXPORT</h1><p>Ability to export files to numerous formats</p></div>
          <div className='feature_right'>IMAGE OF FEATURE</div>
        </div>
        <div className='feature'>
          <div className='feature_left'><h1>QUERY</h1><p>Retrieval of data in an organized and efficient manner</p></div>
          <div className='feature_right'>IMAGE OF FEATURE</div>
        </div>
        <div className='feature'>
          <div className='feature_left'><h1>SORT</h1><p>Organize and manage data by a number of variables</p></div>
          <div className='feature_right'>IMAGE OF FEATURE</div>
        </div>
      </div>
      <h2>LATEST UPDATE</h2>
      <div id="ups_sec" className='updates_section'>
        <h1 id="update_version">Update 1.0.0</h1>
        <p id="update_info">Initial Release</p>
      </div>
      {/* <h2>PRICING</h2>
      <div id="prices" className='pricing_section'>
        <table>
          <tr>
            <th>Plan</th>
            <th>Features</th>
            <th>Pricing</th>
          </tr>
          <tr>
            <td>Individual</td>
            <td>
              <li>Best for students & educators</li>
              <li>Access to full suite of DB features</li>
              <li>Store and manage up to 1TB of data</li>
            </td>
            <td>$15.99 / month</td>
          </tr>
          <tr>
            <td>Business</td>
            <td>
              <li>Best for small businesses</li>
              <li>24/7 customer support</li>
              <li>5TB storage cap</li>
            </td>
            <td>$49.99 / month</td>
          </tr>
          <tr>
            <td>Corporate</td>
            <td>
              <li>Best for large businesses</li>
              <li>Storage up to 20TB of data</li>
              <li>Multi user support for synchronous access</li>
            </td>
            <td>$199.99 / month</td>
          </tr>
        </table>
      </div> */}
      {/* <h2>RESOURCES</h2>
      <div id="res_sec" className='resource_labels_container'>
        <h3 className='resource_label'>CONTACT US</h3>
        <h3 className='resource_label'>SHARE</h3>
      </div>
      <div className='resources_section'>
        <div className='contact_us_section'>
          <ul>
            <li className="contact_li" >Email: ____@ucr.edu</li>
            <li className="contact_li" >Phone: 012-345-6789</li>
            <li className="contact_li" >Our Location: 900 University Ave, Riverside, CA 92521</li>
            <li className="contact_li" ><a href={'https://github.com/CS180-spring/cs180-21-CryPlusPlus'}>GitHub</a></li>
          </ul>
        </div>
        <div className='share_section'>
          <ul>
            {typeof window !== 'undefined' && (<li className="share_li" > <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                Share on Facebook</a></li>)}
                {typeof window !== 'undefined' && (<li className="share_li" ><a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Check out this website!')}`} target="_blank" rel="noopener noreferrer">
                Share on Twitter
              </a></li>)}
          </ul>
        </div>
      </div> */}

    </div>
  )
}

export default Home
