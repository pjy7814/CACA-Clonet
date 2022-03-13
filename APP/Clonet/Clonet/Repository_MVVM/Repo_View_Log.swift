//
//  Repo_View_Log.swift
//  Clonet
//
//  Created by Hye Min Choi on 2022/02/04.
//

import SwiftUI
import Foundation
import Apollo
import Combine

struct Repo_View_Log: View {
    
    @State var repo_n: String
    @StateObject var log_repoViewModel_a = log_repo_ViewModel()
    
    
    init(repo_n: String){
        self.repo_n = repo_n
    }

    var body: some View {
        List(log_repoViewModel_a.Log_repo_list, id: \.id) { log_l in
            Text(log_l.userId + " : " + log_l.commitMsg)

        }.onAppear(){
            log_repoViewModel_a.repo_n = self.repo_n
            log_repoViewModel_a.appear()
            print("log_repoViewModel_a \(log_repoViewModel_a.Log_repo_list)")
            
            // Timer to reload log
            var timer: Timer? = Timer.scheduledTimer(withTimeInterval: 1, repeats: true, block: { _ in
                log_repoViewModel_a.Log_repo_list.removeAll()
                log_repoViewModel_a.fetch(Repo_Name: repo_n)
            })
        }
        
    }
}

struct Repo_View_Log_Previews: PreviewProvider {
    static var previews: some View {
        Repo_View_Log(repo_n: "TEST")
    }
}
