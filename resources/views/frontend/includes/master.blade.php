<main class="main">
        
    <!--Start hero slider-->
            @include('frontend.includes.heroslider')
            <!--End hero slider-->
    
            {{-- featured category  --}}
            @include('frontend.includes.featuredcategory')
            <!-- category slider-->
            @include('frontend.includes.categoryslider')
            <!--End banners-->
    
    
    
    
            <section class="product-tabs section-padding position-relative">
                <div class="container">
                    
                    {{-- new products navbar  --}}
                    @include('frontend.includes.newproductnav')
    
    
            {{-- new products nav item  --}}
                    @include('frontend.includes.newproductitem')
                    <!--End tab-content-->
                </div>
            </section>
            <!--Products Tabs-->
    
    
            {{-- Featured Product  --}}
            @include('frontend.includes.featuredproduct')
    
            
    
    
            <!-- TV Category -->
    
            @include('frontend.includes.tv')
    
    
    
    
    
            <!-- Tshirt Category -->
            @include('frontend.includes.tshirt')
    
       
    
    
     
    
            <!-- Computer Category -->
    @include('frontend.includes.computer')
    
    
            
           {{-- Deals and Offer section  --}}
           @include('frontend.includes.dealandoffer')
    
           
    
      <!--Vendor List -->
    
      @include('frontend.includes.vendor')
    
    
    
    
        </main>