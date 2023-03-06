import Link from 'next/link';
import { useRouter } from 'next/router';

const DumplingsBeefCheese = () => {
  const router = useRouter();
  const productName = router.query.productName;
  const flavors = [
    'dumplings-veggie',
    'dumplings-chicken-&-cabbage',
    'dumplings-beef-&-cheese',
    'dumplings-pork-&-chieves'
  ];

  const renderFlavors = () => {
    return flavors.map((flavor) => {
      if (flavor === productName) {
        return <div key={flavor}>{flavor.split('-').join(' ').toUpperCase()}</div>
      } else {
        return (
          <div key={flavor}>
            <Link href={`/products/${flavor}`}>
              {flavor.split('-').join(' ').toUpperCase()}
            </Link>
          </div>
        );
      }
    });
  };

  return (
    <main>
      <div>
        <div>

          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <a href="">ALL PRODUCTS</a>
                      <span> &gt; </span>
                      <a href="">DUMPLINGS (50 PC)</a>
                      <span> &gt; </span>
                      <a href="">BEEF & CHEESE</a>
                    </div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div><img src="" alt="" /></div>
                            <div><img src="" alt="" /></div>
                            <div><img src="" alt="" /></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div>
                          <div>
                            <a href="">
                              <div>
                                <div>
                                  <div>
                                    <img src="" alt="" />
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div>
                          <div>
                            <h2>
                              BEEF & CHEESE
                              <br />
                              DUMPLINGS (50PC)
                            </h2>
                            <div>
                              <div>
                                <div>$44.95</div>
                              </div>
                              <a href="">
                                STARS & REVIEWS
                              </a>
                            </div>
                            <div>Just $6.49 per meal</div>
                          </div>
                          <div>
                            <div></div>
                          </div>
                        </div>

                        <div>
                          <div>
                            <div>
                              <div>
                              </div>
                                <div>Style</div>
                                <div>
                                  <div>
                                    <span>BEEF & CHEESE</span>
                                    svg
                                  </div>
                                </div>
                            </div>

                            <div>
                              <div>
                                <div>Quantity</div>
                              </div>
                              <div>
                                <div></div>
                                <span></span>
                                <div></div>
                              </div>
                            </div>

                            <div>
                              <div>
                                <div>
                                  <div>
                                    <div>
                                      <div>
                                        <div>
                                          <span>Buy with </span>
                                          <span>svg</span>
                                        </div>
                                      </div>
                                    </div>
                                    <button></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div>
                            <div>
                              <img src="" alt="" />
                            </div>
                            <div>
                              <img src="" alt="" />
                            </div>
                            <div>
                              <img src="" alt="" />
                            </div>
                          </div>
                          <div>Our new limited-edition dumplings feature a rich beef filling with a savory 
                            beef and creamy cheese. Enveloped in a tender dumpling skin, each bite 
                            delivers the splendid flavors of our favorite comfort food - Cheese Burger - 
                            minus the bun.
                          </div>
                        </div>

                        <div>
                          <div>
                            <div>
                              <p>HOW TO MAKE</p>
                              <div>
                                <ul>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                </ul>
                              </div>
                            </div>
                            <div>
                              <p>PRODUCT HIGHLIGHT</p>
                              <div>
                                <ul>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                </ul>
                              </div>
                            </div>
                            <div>
                              <p>NUTRITION FACTS & INGREDIENTS</p>
                              <div>
                                <ul>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                </ul>
                              </div>
                            </div>
                            <div>
                              <p>FAQS</p>
                              <div>
                                <ul>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                </ul>
                                <div></div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <div>
                  <h3>THE ORIGIN OF SOUP DUMPLINGS</h3>
                  <div>
                    <p>
                      Soup dumplings (小笼包, Xiao Long Bao) originate in Shanghai, where they’re the stuff of legend: some focus on a royal Chinese emperor who traveled by river for a taste of these steamed delicacies; others involve an inventive chef looking to wow his guests with this new creation. While their true history may never be known, we can all agree on one thing: We love having soup dumplings ready at home in just 10 minutes!
                    </p>
                  </div>
                </div>
                <div>
                  <img src="" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <h4>OUR FAVORITES</h4>
              <div>
                <div>
                  <a href=""></a>
                  <div>
                    <p></p>
                    <div>
                      <div></div>
                      <div></div>
                    </div>
                    <a href=""></a>
                  </div>
                </div>
                <div>
                  <a href=""></a>
                  <div>
                    <p></p>
                    <div>
                      <div></div>
                      <div></div>
                    </div>
                    <a href=""></a>
                  </div>
                </div>
                <div>
                  <a href=""></a>
                  <div>
                    <p></p>
                    <div>
                      <div></div>
                      <div></div>
                    </div>
                    <a href=""></a>
                  </div>
                </div>
                <div>
                  <a href=""></a>
                  <div>
                    <p></p>
                    <div>
                      <div></div>
                      <div></div>
                    </div>
                    <a href=""></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default DumplingsBeefCheese;