# angular-dashboard
Simple Analytics Dashboard Frontend using Angular


1. Authentication Process

Login Page → Backend API
                ↓
           returns JWT
                ↓
        Angular stores token
                ↓
   HTTP Interceptor attaches token
                ↓
        Protected API endpoints