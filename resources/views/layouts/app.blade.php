<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <!-- <script src="{{ asset('js/app.js') }}" defer></script> -->

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Baloo+Paaji+2&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Abel&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('/css/auth.css') }}" rel="stylesheet">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <div id="app">
        <div class="Navbar">
            <div class="left">
                <a href="{{ url('/') }}" class="logo">TRAINING APP</a>
                <a href="{{ url('/categories') }}">Categories</a>
                <a href="{{ url('/exercises') }}">Exercises</a>
                <a href="{{ url('/routines') }}">Routines</a>
            </div>

            <div class="right">
                @guest
                    <a class="" href="{{route('login') }}">
                        <i class="fa fa-user"></i>
                        {{ __('Log In') }}
                    </a>

                    @if (Route::has('register'))
                    <a class="" href="{{ route('register') }}">
                        <i class="fa fa-sign-in"></i>
                        {{ __('Sign Up') }}
                    </a>
                    @endif
                @else
                    <a class="" href="#">
                        <i class="fa fa-user"></i>
                        {{ Auth::user()->name }} <span class="caret"></span>
                    </a>
                    <a class="" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <i class="fa fa-sign-out"></i>
                        {{ __('Logout') }}
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                @endguest
            </div>
        </div>
        <div class="body">
            @yield('content')
        </div>
    </div>
</body>
</html>
