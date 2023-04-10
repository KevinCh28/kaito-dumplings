import Link from 'next/link';

const AboutUsPage = () => {
  return (
    <div className='blog_page'>
      <div className='blog_page_body'>
        <div className='blog_page_header'>
          <h1>OUR STORY</h1>
        </div>

        <div className='blog_page_content_double'>
          <div className='blog_page_content_double_box_green'>
            <div className='blog_page_content_double_box_content'>
              <h2>The &quot;Dumpling Guys&quot; behind Kaito Dumplings!</h2>
              <p>Kevin Chen has always been passionate about delicious food. Growing up amongst chefs and restaurant owners he eventually opened his own restaurant, Kevin continuously educates himself on ingredients and innovations to achieve this.</p>
              <br />
              <p>One food in particular that he fell in love with was amazing fresh dumplings. The only downside? They were mass-produced with bad ingredients, and if you decided to make some from scratch at home after a long day at work, it was time-consuming.</p>
              <br />
              <p>Kevin knew there had to be a better way for everyone to enjoy fresh quality dumplings, but what was it? It just so happened that the answer was in front of his face the whole time!</p>
            </div>
          </div>
          <div className='blog_page_content_double_box_image'>
            <img src="" alt="Founders Image" />
          </div>
        </div>

        <div className='blog_page_content_single_yellow'>
          <h2>An Idea is Born</h2>
          <p></p>
          <br />
          <p></p>
          <br />
          <p></p>
          <br />
          <p></p>
        </div>

        <div className='blog_page_content_double'>
          <div className='blog_page_content_double_box_image'>
            <div className='blog_page_content_double_box_content'>
              <img src="" alt="Dumplings Image" />
            </div>
          </div>
          <div className='blog_page_content_double_box_green'>
            <div className='blog_page_content_double_box_content'>
              <h2>So, What Makes Kaito Dumplings Special?</h2>
              <br />
              <Link className='blog_page_products_button' href="/products">Get Your Dumplings</Link>
            </div>
          </div>
        </div>
        
        <div className='blog_page_content_single_red'>
          <h2 className='blog_page_content_single_red_header'>Our goal is to break the standard mold for frozen dumplings and bring the quality of restaurant level dumplings to the public with a mix of fun.</h2>
          <p>Kevin Chen, Co-Founder</p>
        </div>

        <div className='blog_page_content_double'>
          <div className='blog_page_content_double_box_purple'>
            <div className='blog_page_content_double_box_content'>
              <h2>Our Impact</h2>
              <p></p>
              <br />
              <p></p>
              <Link className='blog_page_learn_more_button' href="">Learn More</Link>
            </div>
          </div>
          <div className='blog_page_content_double_box_image'></div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;