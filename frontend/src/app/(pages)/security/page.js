"use client";
import { SECURITY_ROUTE, PRIVACY_POLICY_ROUTE, TERMS_AND_CONDITIONS_ROUTE } from "@/constants/routes";
import { usePathname } from "next/navigation";
import legal_page_banner from "../../../../public/legal_page_banner.jpg"
import Link from "next/link";

const SecurityPage = () => {
  const pathname = usePathname();

  return (
    <div>


      <section className="">
        <div className="w-full">

          <div className="w-full bg-cover bg-center bg-no-repeat lg:pt-24 pt-28 lg:pb-24 pb-14 px-12 xl:px-20"
              style={{"backgroundImage":`url(${legal_page_banner.src})`}}> 
              {/* style={{"background-image":" url(https://pagedone.io/asset/uploads/1702271852.png)"}}> */}
            <h1 className="mb-8 text-center text-slate-400 font-bold font-manrope leading-tight lg:text-5xl text-3xl">
              Security
            </h1>
            <p className="text-slate-400 text-lg leading-8 text-center font-normal px-4">
              We're here to help! Reach us by phone at [contact number] or email us at [email address]
              for any queries or concerns.
            </p>
          </div>
          <section className="w-full relative overflow-hidden lg:py-28 py-16">
            <div className="px-12 xl:px-20">
              <div className="flex flex-col md:flex-row w-full gap-8">
                <div className="w-full md:max-w-[176px] md:border-r md:border-gray-200">
                  <ul className="tab-nav flex flex-col md:items-start items-center lg:gap-10 gap-6">
                    <li>
                      <Link href={TERMS_AND_CONDITIONS_ROUTE} className={` ${pathname == TERMS_AND_CONDITIONS_ROUTE ? "text-primary" : "text-gray-500 "} font-medium text-base leading-7 `}>Terms And Conditions</Link>
                    </li>
                    <li>
                      <Link href={PRIVACY_POLICY_ROUTE}
                        className={` ${pathname == PRIVACY_POLICY_ROUTE ? "text-primary" : "text-gray-500 "} font-medium text-base leading-7 `}>Privacy
                        Policy</Link>
                    </li>
                    <li>
                      <Link href={SECURITY_ROUTE}
                        className={` ${pathname == SECURITY_ROUTE ? "text-primary" : "text-gray-500 "} font-medium text-base leading-7 `}>Security</Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full tab-pane max-md:px-4">
                  <h2 className="font-manrope font-bold lg:text-4xl text-3xl dark:text-slate-400 text-slate-800 mb-5">
                    Security
                  </h2>
                  <div className="flex items-center gap-3 lg:mb-10 mb-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.0054 8V12.5322C12.0054 12.8286 12.1369 13.1098 12.3645 13.2998L15 15.5M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"
                        stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                    <p className="font-medium text-xl leading-8 text-primary">
                      Last updated: May 26, 2023
                    </p>
                  </div>
                  <p className="font-normal text-lg leading-8 text-gray-500 lg:mb-10 mb-8">
                    These are terms and conditions (the “Terms”) on which we supply products to you
                    including digital content and services. Please read these Terms carefully before
                    you access our digital content or use our services. These Terms together with our
                    referenced Privacy Policy and Cookies Policy detail how we will provide digital
                    content and/or services to you, how you and we may change or end the contract,
                    what do in the event of a problem and other important information. <br />
                    <br />
                    Who we are - We are Pagedone. <br />
                    <br />
                    How to contact us - You can contact us by telephoning our customer service team at
                    [contact number] or by writing to us [email address].
                  </p>
                  <h5 className="font-manrope font-bold md:text-3xl text-2xl dark:text-slate-400 text-slate-800 mb-4">
                    Contents
                  </h5>
                  <ul className="ml-8 lg:mb-10 mb-8 ">
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#01">Your Agreement to these Terms through Your Access of the Site or Your
                        Use of
                        the Site.</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#02">Content and Services</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#03">agedone Does Not Offer and Does Not Provide Legal Advice</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#04">Pagedone is Not a Law Firm. Pagedone is not offering legal
                        representation</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#05">Pagedone is Not a Referral Service</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#06">There is No Attorney-Client relationship between You and Pagedone and
                        You
                        Agree that You</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#07">Attorney Users Are Not Employees of Pagedone</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#08">All Legal Fees Are Paid to Attorney Users, Not to Pagedone</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#09">There Is No Fee to Pagedone for Finding EngagementsThere Is No Fee to
                        Pagedone for Finding Engagements</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#10">Non-circumvention</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#11">Expectations</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#12">Your Responsibilities</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#13">Your Use and Restrictions</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#14">Confidentiality</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#15">Indemnification</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#16">Communication and Other Data</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#17">Electronic Notices and Agreements</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#18">Premium Services </Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#19">Hyperlinks</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="20">Copyright and Limited Use</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#21">Changes</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#22">Your Content</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#23">Copyright Complaints</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#24">Disclaimer</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#25">Limitation of Liability. Pagedone provides the Site and the Service
                        “as is”,
                        without warranty of any kind</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#26">Entire agreement</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#27">Assignability</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#28">Arbitration</Link>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <Link href="#29">Minimum Age for Use</Link>
                    </li>
                  </ul>
                  <ul
                    className="flex flex-col ml-8 gap-10 list-outside list-decimal font-manrope font-bold text-3xl">
                    <li id="01" className="list-decimal">
                      <h2 className="font-manrope font-bold lg:text-3xl text-2xl dark:text-slate-400 text-slate-800">
                        Your Agreement to these Terms through Your Access of the Site or Your Use of
                        the Site.
                      </h2>
                      <p className="mt-5 font-normal text-lg leading-8 text-gray-500">
                        These Terms govern your use of the Site, both as a visitor and as a registered
                        user (each visitor and each registered user is referred to generally for
                        purposes of these Terms as a "Client User"). BY USING THE SITE, AND/OR BY
                        REGISTERING WITH US, YOU AGREE TO THESE TERMS OF USE, You consent to the
                        information practices disclosed in our Privacy Policy and our Cookies Policy
                        which are incorporated herein by reference, and that you consent to resolve in
                        the State of New York pursuant to the terms set forth herein any dispute that
                        you may have with us, or the Site. Please note that we offer the Site "AS IS"
                        and without warranties. If you are registering an account or using the Site on
                        behalf of an individual or entity other than yourself, you represent that you
                        are authorized by such individual or entity to accept these Terms on such
                        individual's or entity's behalf.
                      </p>
                    </li>
                    <li id="02" className="list-decimal">
                      <h2 className="font-manrope font-bold lg:text-3xl text-2xl dark:text-slate-400 text-slate-800">
                        Content and Services
                      </h2>
                      <p className="mt-5 font-normal text-lg leading-8 text-gray-500">
                        Everything we offer on and through the Site is referred to in these Terms
                        collectively as the "Services". <br />
                        <br />
                        Some of what is on the Site is viewable without registering with us, but to
                        actively participate or store your information, you must register as a member
                        and authorize the use and disclosure of your personal and legal information
                        pursuant to the terms of our Privacy Policy for purposes of allowing us to
                        provide the Services and as otherwise disclosed in our Privacy Policy
                        available at
                        <span className="cursor-pointer underline underline-offset-4">
                          www.pagedone.io/disclaimers-privacy.
                        </span>
                        Pagedone is an online platform that connects legal professionals ("Attorney
                        Users") with potential Client Users seeking legal services. Pagedone itself
                        does not provide legal advice and does not provide legal services of any
                        nature whatsoever. And Pagedone does not guarantee that Client Users will find
                        legal representation through its system. Pagedone offers no opinion nor does
                        it take a position on when or if an attorney-client relationship has been
                        formed between its Client Users and Attorney Users. Pagedone is not a party to
                        the agreements between Client Users and Attorney Users governing the
                        attorney-client relationship nor is Pagedone involved in the actual
                        representation of clients. As a result, Pagedone cannot ensure the completion
                        of agreements between the Client User and Attorney User, the accuracy or
                        completeness of the work-product of the Attorney User, or the integrity of
                        either party. The Client User is responsible for evaluating the integrity and
                        abilities of all Attorney Users with whom the Client User communicates using
                        the Site. You acknowledge that although some of the content, text, data,
                        graphics, images, information, suggestions, guidance, and other material
                        (collectively, "Information") that is provided to you on the Site (including
                        Information provided in direct response to your questions or postings) may be
                        provided by individuals in the legal profession, the provision of such
                        Information does not create an attorney-client relationship and does not
                        constitute an opinion or legal advice, but is provided to assist you with
                        locating an appropriate legal professional. Any form of use of the Site by
                        potential clients or subscribing Attorney Users is not intended to and will
                        not create an attorney-client relationship between or among any person,
                        entity, and Pagedone. Any electronic communication sent to anyone at Pagedone
                        other than an Attorney User will not create an attorney-client relationship
                        between the Client User and Pagedone.
                      </p>
                    </li>
                    <li id="03" className="list-decimal">
                      <h2 className="font-manrope font-bold lg:text-3xl text-2xl dark:text-slate-400 text-slate-800">
                        Pagedone Does Not Offer and Does Not Provide Legal Advice
                      </h2>
                      <p className="mt-5 font-normal text-lg leading-8 text-gray-500">
                        The information that you receive from Pagedone, and its affiliates is for
                        informational and scheduling purposes only. Pagedone is not a design firm nor
                        does it offer you design advice, recommendations, consultations or any kind of
                        counseling. Pagedone makes its Designers available to you and any information
                        provided to you by Pagedone (other than through a Designer that you hire to
                        work with you) is (i) provided by independent design professionals and
                        organizations representing the interests of Pagedone, (ii) is for
                        informational purposes only, and (iii) does not establish any designer-client
                        relationship between you and Pagedone.
                      </p>
                    </li>
                  </ul>
                  <button
                    className="w-full rounded-full mt-10 flex items-center gap-2 justify-center bg-primary hover:bg-indigo-700 transition-all duration-700 text-white py-3.5 px-5 text-center font-semibold text-base">
                    Load More
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 7.5L8.58578 11.0858C9.25245 11.7525 9.58579 12.0858 10 12.0858C10.4142 12.0858 10.7475 11.7525 11.4142 11.0858L15 7.5"
                        stroke="white" strokeWidth="1.8" strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </section>


    </div>
  )
}

export default SecurityPage